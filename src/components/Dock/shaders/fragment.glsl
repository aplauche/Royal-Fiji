// Fragment Shader

varying vec3 csm_vPositionW;

uniform float uTime;
uniform float uWaterLevel;
uniform float uWaveSpeed;
uniform float uWaveAmplitude;
uniform float uFoamDepth;


void main() {
   
    // Set the current color as the base color
    vec3 baseColor = csm_DiffuseColor.rgb;

    // Darken the base color at lower Y values to simulate wet 
    float heightFactor = smoothstep(uWaterLevel + 1.0, uWaterLevel, csm_vPositionW.y);
    baseColor = mix(baseColor, baseColor * 0.5, heightFactor);


  ///----------------
    // Foam Effect
    // Get the y position based on sine function, oscillating up and down over time
    float sineOffset = sin(uTime * uWaveSpeed) * uWaveAmplitude;

    // The current dynamic water height
    float currentWaterHeight = uWaterLevel + sineOffset;

    // figure out stripe positioning 
    float stripe = smoothstep(currentWaterHeight + 0.01, currentWaterHeight - 0.01, csm_vPositionW.y)
               - smoothstep(currentWaterHeight + uFoamDepth + 0.01, currentWaterHeight + uFoamDepth - 0.01, csm_vPositionW.y);

    vec3 stripeColor = vec3(1.0, 1.0, 1.0); // White stripe

    // Apply the foam strip to baseColor    
    vec3 finalColor = mix(baseColor - stripe, stripeColor, stripe);

    // Output the final color
    csm_DiffuseColor = vec4(finalColor, 1.0);

  ///---------------------


    // Output the final color
    //csm_DiffuseColor = vec4(baseColor, 1.0);  





}