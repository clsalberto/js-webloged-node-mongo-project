import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    name: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      required: true
    },
    theme: {
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
    categories: [
      {
        image: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'File'
        },
        name: {
          type: String,
          required: true
        },
        slug: {
          type: String,
          required: true
        }
      }
    ],
    posts: [
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
          required: true,
          ref: 'File'
        },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Category'
        },
        body: {
          type: String,
          minlength: 500,
          required: true
        },
        counters: {
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
        comments: [
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
          }
        ],
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
      }
    ],
    files: [
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
      }
    ],
    visitors: [
      {
        avatar: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'File'
        },
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          unique: true,
          required: true
        }
      }
    ]
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)
export default mongoose.model('Blog', BlogSchema)
