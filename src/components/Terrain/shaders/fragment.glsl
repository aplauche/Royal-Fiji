// Fragment Shader

varying vec3 csm_vPositionW;
uniform float uWaterLevel;
uniform vec3 uGrassColor;
uniform vec3 uUnderwaterColor;


void main() {
   
    // Set the current color as the base color
    vec3 baseColor = csm_DiffuseColor.rgb;


    // Darken the base color at lower Y values to simulate wet sand
    float heightFactor = smoothstep(uWaterLevel + 1.0, uWaterLevel, csm_vPositionW.y);
    baseColor = mix(baseColor, baseColor * 0.5, heightFactor);
   
    // Blend underwater color with base planeMesh to add depth to the ocean bottom
    float oceanFactor = smoothstep(min(uWaterLevel - 0.4, 0.2), 0.0, csm_vPositionW.y);
    baseColor = mix(baseColor, uUnderwaterColor, oceanFactor);


    // Add grass to the higher areas of the terrain
    float grassFactor = smoothstep(uWaterLevel + 0.8, max(uWaterLevel + 1.6, 3.0), csm_vPositionW.y);
    baseColor = mix(baseColor, uGrassColor, grassFactor);
   
    // Output the final color
    csm_DiffuseColor = vec4(baseColor, 1.0);  
}