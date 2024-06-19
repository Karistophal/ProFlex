"use client"
import React from 'react' 

import { useRouter } from 'next/navigation'
import axios from 'axios'


const DeleteUserComp = () => {
  const router = useRouter()

  const supprUser = async () => {
    const confirm = window.confirm("Voulez-vous vraiment supprimer votre compte ?")
    if (confirm) {
      const response = await axios.post('/api/deleteUser')
      const success = response.data
      console.log(response.data);
      
      
      if (success) {
        // Rediriger après la suppression du compte
        router.push('/goodbye');
      } else {
        alert('Erreur lors de la suppression du compte. Veuillez réessayer.');
      }
    }
  }

  return (
    <div className="text-lg text-red-500" onClick={supprUser} >Supprimer le compte</div>
  )
}

export default DeleteUserComp