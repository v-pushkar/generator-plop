import React, { useEffect } from 'react'
import { CircularProgress, Divider } from '@material-ui/core'
import { {{name}}Details, activity } from 'store/ducks/{{Name}}s'

import { ActivityItem } from './ActivityItem'
import { useStyles } from './styles'
import { useSharedStyles } from '../sharedStyles'
import { PrimaryButton } from 'views/Components/Common'

type Props = {
    onClose: () => void
    get{{Name}}Details: (id: number) => void
    clean{{Name}}Details: () => void
    id: number
    isFetchingDetails: boolean
    isErrorFetchingDetails: boolean
    {{name}}Details: {{name}}Details | null
}

export const {{Name}}Details: React.FC<Props> = ({
    onClose,
    get{{Name}}Details,
    clean{{Name}}Details,
    id,
    isFetchingDetails,
    {{name}}Details,
    isErrorFetchingDetails
}) => {
    const classes = useStyles()
    const sharedClasses = useSharedStyles()

    useEffect(() => {
        get{{Name}}Details(id)
        return () => {
            clean{{Name}}Details()
        }
    }, [])

    useEffect(() => {
        if (isErrorFetchingDetails) onClose()
    }, [isErrorFetchingDetails])

    if ({{name}}Details) {
        const { bos{{Name}}Data, author, name } = {{name}}Details
        const { physicalPlaces } = {{name}}Details.bos{{Name}}Data

        const detailsInfo = [
            {
                key: 'Line/Machine/Area:',
                value: physicalPlaces
            },
            {
                key: 'Author:',
                value: author
            },
            {
                key: "Required PPE's:",
                value:
                    bos{{Name}}Data.ppes &&
                    bos{{Name}}Data.ppes
                        .map((ppe) => ppe.contentPath)
                        .join(', ')
            },
            {
                key: 'Notices:',
                value:
                    bos{{Name}}Data.notices &&
                    bos{{Name}}Data.notices
                        .map((notice) => notice.title)
                        .join(', ')
            },
            {
                key: 'Activities:',
                value:
                    bos{{Name}}Data.activities &&
                    bos{{Name}}Data.activities
                        .map((activity) => activity.category?.value)
                        .join(', ')
            },
            {
                key: 'Physical places',
                value:
                    bos{{Name}}Data.physicalPlaces &&
                    bos{{Name}}Data.physicalPlaces
            }
        ]

        return (
            <div
                className={sharedClasses.wrapper}
                data-testid="{{name}}-details"
            >
                <div className={sharedClasses.header}>
                    <span>
                        <div className={sharedClasses.ellipsisText}>
                            {`${name}`.toUpperCase()}
                        </div>
                        <i
                            className={
                                classes.ellipsisVIcon +
                                ' ' +
                                'far fa-ellipsis-v'
                            }
                        />
                    </span>
                    <div
                        onClick={onClose}
                        role="button"
                        tabIndex={0}
                        data-testid="details-close-icon"
                    >
                        <i
                            className={
                                sharedClasses.closeIcon + ' ' + 'far fa-times'
                            }
                        ></i>
                    </div>
                </div>
                <Divider />
                <div className={sharedClasses.contentWrapper}>
                    <div className={sharedClasses.informationsWrapper}></div>
                    <div className={sharedClasses.informationsWrapper}>
                        {detailsInfo.map(({ key, value }) => (
                            <div className={classes.textRow} key={key}>
                                <span className={classes.textTitle}>{key}</span>
                                <span className={classes.textValue}>
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={sharedClasses.shadedWrapper}>
                        {bos{{Name}}Data?.activities.map((item: activity) => (
                            <ActivityItem key={item.id} activity={item} />
                        ))}
                    </div>
                </div>
                <div className={sharedClasses.bottomPanel}>
                    <PrimaryButton
                        variant="contained"
                        onClick={onClose}
                        data-testid="details-close"
                    >
                        Close
                    </PrimaryButton>
                </div>
            </div>
        )
    } else {
        return (
            <>
                {isFetchingDetails && (
                    <div
                        className={sharedClasses.progress}
                        data-testid="loading-details"
                    >
                        <CircularProgress />
                    </div>
                )}
            </>
        )
    }
}
