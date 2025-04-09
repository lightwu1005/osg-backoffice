type ParticipantPosition = 'NEUTRAL' | 'HOME' | 'AWAY'

export interface PlayLogTimelineParameters {
    eventId: string,
    provider: string,
    sportName: string,
    types?: string[],
    participantPositions?: ParticipantPosition[]
}