import { User } from "./user";

export class Chat
{
    id:number;
    last_message: number;
    is_group: number;
    sender: string;
    receiver: string;
    chat_sender: User;
    chat_receiver: User;
}