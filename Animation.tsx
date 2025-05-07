import React from 'react';

const Animation: React.FC<{ animationName: string }> = ({ animationName }) => {
    return (
        <div className={`animation ${animationName}`}>
            {/* Animation content goes here */}
        </div>
    );
};

export default Animation;