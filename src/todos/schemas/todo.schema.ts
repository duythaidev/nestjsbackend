
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    description: string;

    @Prop()
    isChecked: boolean;

    @Prop()
    breed: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
