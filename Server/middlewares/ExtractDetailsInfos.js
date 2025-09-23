export function ExtractDetectionDetails(fromServer) {
    const { attributes, demographics, liveness, mask, no_match, confidence } = fromServer
    
    return {
        attributes,
        demographics,
        liveness,
        mask,
        no_match,
        confidence
    }
}