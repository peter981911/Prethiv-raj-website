import React from 'react';
import './LiquidImage.css';

/**
 * LiquidImage
 * Renders a project image with a premium CSS-only liquid hover distortion effect.
 * Uses CSS filter: hue-rotate + scale + a shimmer sweep pseudo-element.
 * Zero WebGL context overhead — safe to use in large grids.
 */
const LiquidImage = ({ src, alt }) => {
    return (
        <div className="liquid-image-wrap">
            <img src={src} alt={alt || 'Project preview'} />
        </div>
    );
};

export default LiquidImage;
