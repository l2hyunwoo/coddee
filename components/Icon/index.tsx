import type { FC } from 'react'

export interface Props {}
interface State {}

const Icon: FC<Props> = () => <></>

const AddReaction = () => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 fill-neutral-600 dark:fill-neutral-400"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 7.5c0 .169-.01.336-.027.5h1.005A5.5 5.5 0 1 0 8 12.978v-1.005A4.5 4.5 0 1 1 12 7.5zM5.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2 2.5c.712 0 1.355-.298 1.81-.776l.707.708A3.49 3.49 0 0 1 7.5 10.5a3.49 3.49 0 0 1-2.555-1.108l.707-.708A2.494 2.494 0 0 0 7.5 9.5zm2-2.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2.5 3h1v2h2v1h-2v2h-1v-2h-2v-1h2v-2z"
      />
    </svg>
  )
}

export default Object.assign(Icon, { AddReaction })
