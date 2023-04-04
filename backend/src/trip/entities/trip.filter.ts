import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class TripFilter {
    @Field(() => Date, {nullable: true})
    startDate: Date

    @Field(() => Date, { nullable: true})
    endDate: Date
}