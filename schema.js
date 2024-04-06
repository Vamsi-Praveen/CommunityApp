userSchema = {
    avatar: null,
    bio: '',
    createdAt: new Date().toISOString(),
    savedPosts: [],
    isVerified: false,
    following: [],
    followers: [],
    fullName: '',
    username: ''
}

posts = {
    description: '',
    image: '',
    date: new Date().toISOString(),
    likes: [],
    comments: [],
    userId: ''
}