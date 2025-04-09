/**
 * @param uuid Member Unique ID
 * @param userName User display name
 * @param organization The code/name of the organization this member belongs to
 * @param functionality To represent this member active on which BO
 * @param role To represent the position of this member
 * @param permission To represent what kind of permission this member have
 * @param status Account current status
 * @param email Member's email address
 * @param jobTitle To display member job title
 * @param phoneNumber User's contact phone number
 */
export interface UpdateMemberInfoParameter {
    uuid: string,
    userName?: string,
    organization?: string,
    role?: string,
    permission?: string,
    status?: string,
    email?: string,
    jobTitle?: string,
    phoneNumber?: string
}