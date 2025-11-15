import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'lecture', 'assignment', 'project', 'exam', 'personal'],
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true
  }],
  color: {
    type: String,
    enum: ['blue', 'green', 'purple', 'yellow', 'pink', 'gray'],
    default: 'blue'
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  wordCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate word count before saving
noteSchema.pre('save', function(next) {
  this.wordCount = this.content.split(/\s+/).filter(word => word.length > 0).length;
  next();
});

export default mongoose.models.Note || mongoose.model('Note', noteSchema);