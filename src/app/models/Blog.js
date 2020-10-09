import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema(
  {
    image: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)

const ThemeSchema = new mongoose.Schema(
  {
    logo: mongoose.Schema.Types.ObjectId,
    image: mongoose.Schema.Types.ObjectId,
    primaryColor: {
      type: String,
      required: true,
      default: '#7159c1'
    },
    secondaryColor: {
      type: String,
      required: true,
      default: '#00a65a'
    },
    themeType: {
      type: String,
      required: true,
      default: 'light'
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id
        delete ret.__v
      }
    }
  }
)

const CountersSchema = new mongoose.Schema(
  {
    views: {
      type: Number,
      required: true,
      default: 0
    },
    likes: {
      type: Number,
      required: true,
      default: 0
    },
    dislikes: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)

const CommentSchema = new mongoose.Schema(
  {
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Visitor'
    },
    comment: String,
    commentedAt: {
      type: Date,
      required: true,
      default: new Date()
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      minlength: 200,
      required: true
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    body: {
      type: String,
      minlength: 500,
      required: true
    },
    counters: {
      type: CountersSchema,
      required: true
    },
    comments: [CommentSchema],
    publicationDate: {
      type: Date,
      required: true,
      default: new Date()
    },
    published: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)

const VisitorSchema = new mongoose.Schema(
  {
    avatar: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    url: {
      type: String,
      require: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)

const BlogSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    theme: ThemeSchema,
    categories: [CategorySchema],
    posts: [PostSchema],
    visitors: [VisitorSchema],
    files: [FileSchema]
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)
export default mongoose.model('Blog', BlogSchema)
