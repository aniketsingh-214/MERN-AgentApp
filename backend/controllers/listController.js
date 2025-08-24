const xlsx = require('xlsx');
const Agent = require('../models/Agent');
const Task = require('../models/Task');

exports.uploadList = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }

    const agents = await Agent.find().limit(5);
    if (agents.length < 5) {
      return res.status(400).json({ msg: 'Need at least 5 agents in the system to distribute.' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (data.length === 0 || !data[0].FirstName || !data[0].Phone) {
        return res.status(400).json({ msg: 'Invalid file format. Ensure columns are named "FirstName", "Phone", and optionally "Notes".' });
    }

    const tasks = [];
    const listName = req.file.originalname + '-' + Date.now(); 

    data.forEach((row, index) => {
      const agentIndex = index % 5; 
      
      const task = {
        firstName: row.FirstName,
        phone: String(row.Phone), 
        notes: row.Notes || '',
        assignedTo: agents[agentIndex]._id, 
        listName: listName,
      };
      tasks.push(task);
    });

    if (tasks.length > 0) {
      await Task.insertMany(tasks);
    }

    res.status(200).json({ msg: `${tasks.length} tasks have been successfully uploaded and distributed.` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error during file processing.');
  }
};


exports.getDistributedLists = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email'); 
        const groupedByAgent = tasks.reduce((acc, task) => {
            const agentName = task.assignedTo.name;
            if (!acc[agentName]) {
                acc[agentName] = [];
            }
            acc[agentName].push(task);
            return acc;
        }, {});

        res.json(groupedByAgent);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};