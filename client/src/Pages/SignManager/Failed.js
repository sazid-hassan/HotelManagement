import React from 'react';
import { useHistory } from 'react-router-dom';


const Failed = () => {
    const history = useHistory();

    return <div style={{
        marginTop: 10
    }}>
        Failed!
        < br />
        <button onClick={() => { history.push('/signup') }}>Go to LogIn</button>

    </div >;
};

export default Failed;
