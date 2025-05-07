import React, { useState } from 'react';

const DecisionTree = ({ decisions }) => {
    const [currentDecision, setCurrentDecision] = useState(decisions[0]);

    const handleDecision = (nextDecision) => {
        const foundDecision = decisions.find(decision => decision.id === nextDecision);
        if (foundDecision) {
            setCurrentDecision(foundDecision);
        }
    };

    return (
        <div className="decision-tree">
            <h2>{currentDecision.text}</h2>
            <div className="options">
                {currentDecision.options.map(option => (
                    <button key={option.id} onClick={() => handleDecision(option.next)}>
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DecisionTree;