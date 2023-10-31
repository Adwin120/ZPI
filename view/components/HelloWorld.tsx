import React, { useEffect } from "react";

const HelloWorld: React.FC<{ test?: boolean }> = ({ test }) => {
    useEffect(() => {
        console.log(test);
    }, [test]);

    return <h1>Hello World from React</h1>;
};

export default HelloWorld;
