type Knife = {
    number: number
    src: string
    size: string
    rapport: string
    fragments:number
    fragmentsMargin: string
    streams:number
    streamsMargin: number | string,
    circle: boolean
    width: number
    height: number
    double: boolean
    base64: string
}

const exampleKnifeQuery = [['number', 'number'], ['width', 'number'], ['height', 'number']]


export const checkQuery = (query: Object) => {
    const likeArray = Object.entries(query)
    const matchProp: string[] = []
    
    return likeArray.every(prop => {
        console.log(prop, typeof Number(prop[1]))
        //check on repeat
        if (matchProp.includes(prop[0])) {
            return false
        }

        let isMatch = false        
        
        exampleKnifeQuery.forEach(item => {
            if (item[0] === prop[0] && item[1] === typeof Number(prop[1])) {
                isMatch = true
                matchProp.push(item[0])
            }
        })
        
        return isMatch
    })
}