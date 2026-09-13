let Proposal;
try {
  Proposal = require('../models/Proposal');
} catch (e) {
  Proposal = require('../models/proposal');
}

exports.submitProposal = async (req, res) => {
  try {
    const { jobId, coverLetter, bidAmount, deliveryDays } = req.body;
    const existing = await Proposal.findOne({ job: jobId, freelancer: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied to this project' });
    }

    const proposal = await Proposal.create({
      job: jobId,
      freelancer: req.user._id,
      coverLetter,
      bidAmount,
      deliveryDays
    });

    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ job: req.params.jobId })
      .populate('freelancer', 'name skills college rating');
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
