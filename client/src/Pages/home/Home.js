import React from 'react'
import RoomCard from './RoomCard'

const Rooms = [
    {
        id: 1,
        type: "double",
        name: "Couple Delux",
        price: "10000৳",
        desc: "This Luxurious room is especially designed for couples only! Have great time with your partner",
        img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
        id: 2,
        type: "double",
        name: "Couple Economy",
        price: "7000৳",
        desc: "This impressive room is especially designed for couples only!",
        img: "https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
        id: 3,
        type: "family",
        name: "Family Economy",
        price: "8000৳",
        desc: "Beautifully designed for your family. Enjoy times together.",
        img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
    },
    {
        id: 4,
        type: "double",
        name: "Couple Economy",
        price: "7000৳",
        desc: "This impressive room is especially designed for couples only!",
        img: "https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
]

const Home = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center" }}>
            {
                Rooms.map(rm =>
                    <RoomCard
                        name={rm.name}
                        type={rm.type}
                        desc={rm.desc}
                        img={rm.img}
                        price={rm.price}
                        key={rm.id}
                    />
                )
            }
        </div>
    )
}

export default Home
