// Firebase
import { database, auth } from 'firebase/init'

// Interfaces
import { Note } from 'interfaces'

export function sendToTrash(notesToTrash: Note[]) {
    return new Promise(resolve => {
        const user = auth.currentUser?.uid
        database.collection('users').doc(user).get()
            .then(snapshot => {
                const notes: Note[] = snapshot.data()!.notes
                const trash: Note[] = snapshot.data()!.trash

                notesToTrash.forEach(noteToTrash => {
                    notes.forEach((note, index) => {
                        if (noteToTrash.id === note.id) {
                            notes.splice(index, 1)
                            Object.assign(
                                noteToTrash,
                                { deleted: Date.now(), selected: false }
                            )
                            trash.push(noteToTrash)
                        }
                    })
                })

                database.collection('users').doc(user).update({ notes, trash })
                    .then(() => resolve({ notes, trash }))
            })
    })
}