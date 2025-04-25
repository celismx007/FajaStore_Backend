import bycrpt from 'bcrypt'

export const encrypt = async (text) => { 
    const hash = await bycrpt.hash(text, 10);
    return hash;
}

export const compare = async (password, hashPassword) => { 
    return await bycrpt.compare(password, hashPassword)
}