import React, { useState } from 'react'

// Components
import Button from 'components/UI/Button'

// Icons
import { Icon } from '@iconify/react'
import selectAll from '@iconify/icons-mdi/select-all'
import selectOff from '@iconify/icons-mdi/select-off'
import selectInverse from '@iconify/icons-mdi/select-inverse'
import deleteCircleOutline from '@iconify/icons-mdi/delete-circle-outline'

// CSS styles
import './styles.css'

function Overview() {

    const [multiselection,] = useState(false) // Settar este estado 
                                                                // no redux!!

    return (
        <div className="Overview">
            <div className={["MultiselectionOptions", multiselection && "Show"].join(' ')}>
                <Button onclick={() => console.log('Select All')}>
                    <Icon icon={selectAll} />
                    <span>Select All</span>
                </Button>
                <Button onclick={() => console.log('Unselect All')}>
                    <Icon icon={selectOff} />
                    <span>Unselect All</span>
                </Button>
                <Button onclick={() => console.log('Invert Selection')}>
                    <Icon icon={selectInverse} />
                    <span>Invert Selection</span>
                </Button>
                <Button btnType="Danger" onclick={() => console.log('Delete Selected')}>
                    <Icon icon={deleteCircleOutline} />
                    <span>Delete Selected</span>
                </Button>
            </div>

            <div className="NotesOverview">
                {/*render dynamically created cards from server*/}
                <div className="AddNoteCard">

                </div>
            </div>
        </div>
    )
}

export default Overview