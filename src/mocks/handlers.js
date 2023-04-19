import { rest } from "msw"

const baseURL = 'https://project-5-api.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user`, (req, res, ctx) => {
        return res(
            ctx.json({
                "pk": 2,
                "username": "sean",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 2,
                "profile_image": "https://res.cloudinary.com/dgj9rjuka/image/upload/v1/media/images/download_qj1wrv"
            })
        )
    }),
    rest.post(`${baseURL}dj-rest-auth/logout`, (req, res, ctx) => {
        return res(ctx.status(200))
    })
]