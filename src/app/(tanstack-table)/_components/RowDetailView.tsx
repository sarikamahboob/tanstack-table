import { User } from '../../../../Types/types'

const RowDetailView = ({ user }: { user: User }) => {
  return (
    <div className='flex flex-col justify-center items-center text-lg'>
      <img src={user?.profile} alt="" width={200} height={200} className='rounded-full' />
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Age: {user.age}</p>
      <p>Progress: {user.progress}</p>
    </div>
  )
}

export default RowDetailView