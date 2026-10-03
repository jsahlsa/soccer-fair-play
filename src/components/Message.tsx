import type { MessageType } from '../types'

const Message = ({
  message
}: {
  message: MessageType
}) => {
  return (
    <>
      <p
        className={`${message.type === 'error'
          ? 'error-message'
          : message.type === 'success'
            ? 'success-message'
            : 'message'
          }`}>
        {message.content}
      </p>
    </>
  )
}

export default Message
