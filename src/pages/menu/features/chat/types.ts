export interface IMessage {
  content: string,
  author: {
    id: string,
    username: string,
  },
  time: string,
}

