import { Field, ObjectType } from '@nestjs/graphql'
import { User as PrismaUser } from '@prisma/client'
import { GraphQLCuid } from 'graphql-scalars'

@ObjectType({
  description:
    'The User object represents a registered user within the application.'
})
export class User implements Partial<PrismaUser> {
  @Field(() => GraphQLCuid, {
    description:
      'The unique identifier (ID) of the user. This is a unique string assigned to each user upon registration and is used for user identification within the application.'
  })
  id: string

  @Field(() => String, {
    description:
      'The email address of the user. This field is used for user authentication and communication purposes.'
  })
  email: string

  @Field(() => String, {
    nullable: true,
    description:
      'The full name or display name of the user. This field is optional and can be used to store additional identity information of the user.'
  })
  name: string | null

  @Field(() => Date, {
    description:
      'The creation timestamp of the user account. This field records the exact date and time when the user account was created.'
  })
  createdAt: Date

  @Field(() => Date, {
    description:
      "The last update timestamp of the user account. This field records the most recent date and time when the user's information was modified."
  })
  updatedAt: Date
}
