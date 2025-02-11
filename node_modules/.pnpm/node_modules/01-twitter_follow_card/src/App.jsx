import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Angel Duran',
        isFollowing: true,
    },
    {
        userName: 'pheralb',
        name: 'Pablo Hernandez',
        isFollowing: true,
    },
    {
        userName: 'jonathan99-ai',
        name: 'Jonathan Zuluaga',
        isFollowing: false,
    }
]

export function App () {
    return (
        <section className='App'>
        {
            users.map(({ userName, name, isFollowing }) => (
                <TwitterFollowCard
                      key={userName}
                      userName={userName}
                      initialIsFollowing={isFollowing}>
                      {name}
                    </TwitterFollowCard>
                )
            )
        }
        </section>
    )
}
