import React from 'react'
import styles from '../../styles/ProfileList.module.css'
import { Container } from 'react-bootstrap'
import Profile from './Profile'
import { useProfileData } from '../../contexts/ProfileDataContext'

const ProfileList = ({ mobile, page }) => {
    const { ProfileList } = useProfileData();
    { page ? console.log('page') : console.log('not') }

    return (
        <Container className={`${styles.Container} ${mobile && 'd-lg-none text-center mb-3'}`}>
            <p><i class="fa-regular fa-user" /> Profiles: </p>

            {mobile ? (
                <div className='d-flex justify-content-around'>
                    {ProfileList.results.slice(0, 4).map(profile => (
                        <Profile key={profile.id} profile={profile} mobile />
                    ))}
                </div>
            ) : page ? (

                ProfileList.results.map(profile => (
                    <Profile key={profile.id} profile={profile} page />
                ))
            ) : (
                ProfileList.results.map(profile => (
                    <Profile key={profile.id} profile={profile} />
                ))
            )}

        </Container>
    )
}

export default ProfileList