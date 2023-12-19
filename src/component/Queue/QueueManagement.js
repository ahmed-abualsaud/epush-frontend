import { useEffect, useRef, useState } from "react"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"
import useCoreApi from "../../api/useCoreApi"
import ShowRowCell from "../../layout/TableOperation/ShowRowCell"
import Table from "../../layout/Table/Table"
import TableHead from "../../layout/Table/TableHead"
import HeadRow from "../../layout/Table/HeadRow"
import HeadCells from "../../layout/Table/HeadCells"
import TableBody from "../../layout/Table/TableBody"
import DataRows from "../../layout/Table/DataRows"
import withOperationCellParameters from "../../HOC/withOperationCellParameters"
import useQueueApi from "../../api/useQueueApi"
import Switch from "../../layout/Shared/Switch"
import { showAlert } from "../../utils/validator"

const QueueManagement = () => {

    // const queues = ['message', 'mail', 'sms', 'notification']

    const { listSenders } = useCoreApi()
    const [queueName, setQueueName] = useState([])
    const { checkQueuesEnabled, enableDisableQueue, enableDisableQueues } = useQueueApi()

    const setupLock = useRef(true)
    const setup = async() => {
        const senders = await listSenders(1000000000000)
        const queuesEnabled = await checkQueuesEnabled(['mail', 'sms', 'notification', ...senders.data.map(sender => sender?.name.replace(/ /g, "_"))])
        if (senders.data) setQueueName([
            {queue: 'mail', enabled: queuesEnabled.mail}, 
            {queue: 'sms', enabled: queuesEnabled.sms}, 
            {queue: 'notification', enabled: queuesEnabled.notification}, 
            ...senders.data.map(sender => ({queue: sender?.name.replace(/ /g, "_"), enabled: queuesEnabled[sender?.name.replace(/ /g, "_")]}))
        ])
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderQueue = (queue) => {
        render("content", "job-management", queue.queue)
    }

    const enableDisableAQueue = async (queue, value) => {
        showAlert(await enableDisableQueue(queue, value))
    }

    const enableDisableAQueues = async (queues, value) => {
        setQueueName(queues.map(queue => ({queue: queue, enabled: value})))
        showAlert(await enableDisableQueues(queues, value))
    }

    const renderQueueStatus = (queue) => {
        return  <Switch
            key={queue?.enabled}
            id={"queue-switch-" + queue?.queue} 
            labelLeft="Disable Queue" 
            labelRight="Enable Queue" 
            defaultChecked={queue?.enabled}
            onLeft={() => enableDisableAQueue(queue?.queue, false)}
            onRight={() => enableDisableAQueue(queue?.queue, true)}
        />
    }


    return (
        <Page>
            <Switch
                id={"queue-switch-all"} 
                labelLeft="Disable All Queues" 
                labelRight="Enable All Queue" 
                defaultChecked={true}
                onLeft={() => enableDisableAQueues(queueName.map(q => q.queue), false)}
                onRight={() => enableDisableAQueues(queueName.map(q => q.queue), true)}
            />
            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={['queue', 'status']}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows  height="100px" columns={['queue', 'status']} rows={queueName.map(q => {
                        q.status = () => renderQueueStatus(q)
                        return q
                    })}>
                        {withOperationCellParameters(ShowRowCell, "showFunction", renderQueue)}
                    </DataRows>
                </TableBody>
            </Table>

        </Page>
    )
}

export default QueueManagement