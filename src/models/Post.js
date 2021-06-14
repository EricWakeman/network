export default class Post {
  constructor(data) {
    this.body = data.body
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.likes = data.likes
    this.creatorImg = data.creator.picture
    this.id = data.id
    this.likeIds = data.likeIds
    this.imgUrl = data.imgUrl
  }
}
