import { useEffect } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { supabase, useObjectState, useUser } from 'services'
import { Modal } from 'containers'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export interface Props extends ReactProps {}
interface State {
  isMyInfoOpen: boolean
  isLoginOpen: boolean
  roomList: Array<
    NTable.Rooms & { newChat: string; newDate: string; newCount: number }
  >
}

const Layout: FC<Props> = ({ children }) => {
  const [{ isMyInfoOpen, isLoginOpen, roomList }, setState] =
    useObjectState<State>({
      isMyInfoOpen: false,
      isLoginOpen: false,
      roomList: []
    })
  const [user] = useUser()
  const { query } = useRouter()

  const getRoomList = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select(
        `
      id,
      name,
      logo_url,
      chats (
        content,
        code_block,
        created_at
      )
    `
      )
      .order('created_at', { ascending: false, foreignTable: 'chats' })
      .limit(1, { foreignTable: 'chats' })
    if (error) {
      console.error(error)
      return
    }
    setState({
      roomList: (data as any[]).map((item) => ({
        ...item,
        newChat:
          (item.chats?.at(0)?.code_block
            ? '코드'
            : item.chats?.at(0)?.content) || '',
        newDate: item.chats?.at(0)?.created_at || '',
        newCount: 0
      }))
    })
  }

  useEffect(() => {
    getRoomList()
  }, [])

  useEffect(() => {
    supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public' },
        (payload: any) => {
          if (payload.table !== 'chats') return
          const index = roomList.findIndex(
            (item) => item.id === payload.new.room_id
          )
          setState({
            roomList: [
              ...roomList.slice(0, index),
              {
                ...roomList[index],
                newChat: payload.new.code_block ? '코드' : payload.new.content,
                newDate: payload.new.created_at,
                ...(payload.new.room_id !== query.id
                  ? { newCount: roomList[index].newCount + 1 }
                  : {})
              },
              ...roomList.slice(index + 1)
            ]
          })
        }
      )
      .subscribe()
  }, [roomList, query.id])
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="flex gap-5">
          <div className="sticky top-0 flex h-screen w-80 flex-col divide-y border-x border-neutral-200 bg-white">
            <header className="flex h-12 items-center justify-between px-5">
              <Link href="/">
                <a>
                  <img src="/coddee-black.svg" alt="" className="h-5" />
                </a>
              </Link>
              {user ? (
                <button onClick={() => setState({ isMyInfoOpen: true })}>
                  <img
                    src={user.avatar_url}
                    alt=""
                    className="h-8 w-8 rounded-full"
                  />
                </button>
              ) : (
                <button
                  className="text-sm"
                  onClick={() => setState({ isLoginOpen: true })}
                >
                  로그인
                </button>
              )}
            </header>
            <menu className="flex-1 overflow-auto">
              <ul>
                {roomList.map((item, key) => (
                  <li key={item.id}>
                    <Link href={`/room/${item.id}`}>
                      <a
                        className={classnames(
                          'flex h-16 items-center justify-between gap-4 px-5',
                          query.id === item.id
                            ? 'bg-blue-100'
                            : 'hover:bg-blue-50',
                          { 'pointer-events-none': query.id === item.id }
                        )}
                        onClick={() => {
                          if (item.newCount > 0)
                            setState({
                              roomList: [
                                ...roomList.slice(0, key),
                                { ...item, newCount: 0 },
                                ...roomList.slice(key + 1)
                              ]
                            })
                        }}
                      >
                        <img src={item.logo_url} alt="" className="h-8 w-8" />
                        <div className="flex-1">
                          <div
                            className={classnames({
                              'font-semibold': query.id === item.id
                            })}
                          >
                            {item.name}
                          </div>
                          <div className="w-40 truncate text-xs text-neutral-500">
                            {item.newChat}
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <div className="text-xs text-neutral-500">
                            {!!item.newDate &&
                              dayjs(item.newDate).locale('ko').fromNow()}
                          </div>
                          <div className="flex h-4 justify-end">
                            {item.newCount > 0 && (
                              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-2xs text-white">
                                {item.newCount}
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </menu>
          </div>
          <div id="div" className="flex-1 border-x border-neutral-200 bg-white">
            {children}
          </div>
        </div>
      </div>
      <Modal.MyInfo
        isOpen={isMyInfoOpen}
        onClose={() => setState({ isMyInfoOpen: false })}
      />
      <Modal.Login
        isOpen={isLoginOpen}
        onClose={() => setState({ isLoginOpen: false })}
      />
    </>
  )
}

export default Layout