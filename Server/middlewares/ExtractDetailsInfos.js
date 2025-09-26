export function ExtractDetectionDetails(fromServer) {
    const { attributes, demographics, liveness, mask, no_match, confidence } = fromServer
    const { mean, variance } = demographics.age
    return {
        ...attributes,
        ...demographics,
        age: mean,
        age_variance: variance,
        liveness,
        mask,
        no_match,
        confidence
    }
}