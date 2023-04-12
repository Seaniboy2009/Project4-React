import React, { useEffect, useState } from 'react'
import styles from '../../styles/PopularProfiles.module.css'
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import Asset from '../../components/Asset'

const PopularProfiles = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        PopularProfiles: { results: [] },
    })

    const { PopularProfiles } = profileData;
    const currentUser = useCurrentUser()

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get('/profiles/?ordering=-followers_count')
                setProfileData(prevState => ({
                    ...prevState,
                    PopularProfiles: data,
                }))
                setHasLoaded(true);
            } catch (error) {

            }
        }

        setHasLoaded(false);
        handleMount()
    }, [currentUser])

    return (
        <Container className={`${styles.Container} ${mobile && 'd-lg-none text-center mb-3'}`}>
            <p><i class="fa-regular fa-user" /> Profiles: </p>
            {hasLoaded ? (
                <>
                    {mobile ? (
                        <div className='d-flex justify-content-around'>
                            {PopularProfiles.results.slice(0, 4).map(profile => (
                                <p key={profile.id}>{profile.owner}</p>
                            ))}
                        </div>
                    ) : (

                        PopularProfiles.results.map(profile => (
                            <p key={profile.id}>{profile.owner}</p>
                        ))
                    )}
                </>

            ) : (
                <Asset spinner />
            )}
        </Container>
    )
}

export default PopularProfiles