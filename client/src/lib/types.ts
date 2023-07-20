export type Authentication = {
    username: string
    password: string
};

export type User = {
    id: string
    username: string
    password: string
    keys: Key[]
    createdAt: Date
    updatedAt: Date
};

export type Key = {
    id: string
    userId: string
    user: User
    requests: RequestDetails[]
    label: string
    createdAt: Date
    updatedAt: Date
};

export type RequestDetails = {
    id: string
    message: string
    statusCode: string
    url: string
    header: string
    query: string[]
    keyId: string
    key: Key
    sentAt: Date
};

export interface ApiError {
    status: string
    message: string
};