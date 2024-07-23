export class Message {
  content: string;
  role: string;

  constructor(content: string, role: string) {
    this.content = content;
    this.role = role;
  }
}