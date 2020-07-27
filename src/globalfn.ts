// Firebase
import { database, auth } from 'firebase/init'

// Interfaces
import { Note } from 'interfaces'

export function sendNotesTo(from: "notes" | "trash", to: "notes" | "trash", notesToSend: Note[]) {
    return new Promise<{notes: Note[], trash: Note[]}>(resolve => {
        const user = auth.currentUser?.uid
        database.collection('users').doc(user).get()
            .then(snapshot => {
                const notesContainers: {notes: Note[], trash: Note[], [key: string]: any} = {
                    notes: snapshot.data()!.notes,
                    trash: snapshot.data()!.trash
                }
                
                const origin: Note[] = notesContainers[from]
                const destiny: Note[] = notesContainers[to]

                notesToSend.forEach(noteToSend => {
                    origin.forEach((note, index) => {
                        if (noteToSend.id === note.id) {
                            origin.splice(index, 1)
                            Object.assign(
                                noteToSend,
                                { 
                                    [to==='trash'?'deleted':'created']: Date.now(), 
                                    selected: false 
                                }
                            )
                            destiny.push(noteToSend)
                        }
                    })
                })
                
                const notes = from === 'notes' ? origin : destiny
                const trash = to === 'trash' ? destiny : origin

                database.collection('users').doc(user).update({ notes, trash })
                    .then(() => resolve({ notes, trash }))
            })
    })
}

export function sortFunction(a: any, b: any, order: string) {
    const elA = typeof a[order] === 'string' ? a[order].toLowerCase() : a[order]
    const elB = typeof b[order] === 'string' ? b[order].toLowerCase() : b[order]
    if (elA > elB) return order === 'title' ? 1 : -1
    else if (elA < elB) return order === 'title' ? -1 : 1
    else return 0
}

export function selectAll(filteredNotes: Note[]) {
    return filteredNotes.map(note => ({ ...note, selected: true }))
}

export function unselectAll(filteredNotes: Note[]) {
    return filteredNotes.map(note => ({ ...note, selected: false }))
}

export function invertSelection(filteredNotes: Note[]) {
    return filteredNotes.map(note => {
        if (note.selected) return { ...note, selected: false }
        else return { ...note, selected: true }
    })
}