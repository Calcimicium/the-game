export default interface BaseMessage<TDto> {
	event: string;
	body: MessageBody<TDto>;
}

export interface MessageBodyArray<TDto> extends Array<TDto> {

}

export interface MessageBodyEntity<TDto> {

}

export type MessageBody<TDto> = MessageBodyArray<TDto> | MessageBodyEntity<TDto>
