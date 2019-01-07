import {Entity, ObjectIdColumn, ObjectID, Column} from 'typeorm'

@Entity()
export class Cat {

    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    name: string

    @Column()
    age: number

}
