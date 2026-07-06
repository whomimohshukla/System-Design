const express = require('express');
const router = express.Router();
const tokenBucketRateLimit = require('../middleware/rateLimitTokenBucket');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

// Reads: cheap, generous limit — 60 requests, refilling 1/sec (sustained 60/min, burst up to 60)
const readLimiter = tokenBucketRateLimit({ capacity: 60, refillRate: 1, label: 'notes:read' });

// Writes: more expensive (DB write + potential downstream side effects) — stricter
const writeLimiter = tokenBucketRateLimit({ capacity: 10, refillRate: 10 / 60, label: 'notes:write' });

// Delete: destructive, stricter still — prevents abuse/mistakes at scale
const deleteLimiter = tokenBucketRateLimit({ capacity: 5, refillRate: 5 / 60, label: 'notes:delete' });

router.post('/', writeLimiter, createNote);
router.get('/', readLimiter, getNotes);
router.get('/:id', readLimiter, getNoteById);
router.put('/:id', writeLimiter, updateNote);
router.delete('/:id', deleteLimiter, deleteNote);

module.exports = router;