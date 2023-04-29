import {IOperation, IScenario, OperationType} from "./OperationsGenerator";

export class ScenarioGenerator {

    private readonly channelNames: Map<string, string> = new Map<string, string>(); // projectId -> channelVariableName
    private readonly channelTypeCounts: Map<OperationType, number> = new Map<OperationType, number>();
    private readonly timeSortedOperations: IOperation[];
    private scenario: IScenario | undefined;

    constructor(operations: IOperation[]) {
        this.timeSortedOperations = [...operations].sort((a, b) => a.time! > b.time! ? 1 : -1).map(o => o);
    }

    public generate(): IScenario {

        this.channelNames.clear();
        this.scenario = {
            operations: [],
            code: startingCode()
        };
        this.channelTypeCounts.set(OperationType.RawWebSocketChannel, 0);
        this.channelTypeCounts.set(OperationType.SignalRChannel, 0);
        this.channelTypeCounts.set(OperationType.GraphQLChannel, 0);

        for (let i = 0; i < this.timeSortedOperations.length; i++) {

            this.scenario.operations.push(this.timeSortedOperations[i]);

            this.scenario.code += "\t\t";

            switch (this.timeSortedOperations[i].type) {
                case OperationType.Http:
                    this.addHttp(this.timeSortedOperations[i]);
                    break;
                case OperationType.RawWebSocketChannel:
                case OperationType.GraphQLChannel:
                case OperationType.SignalRChannel:
                    this.addChannel(this.timeSortedOperations[i]);
                    break;
                case OperationType.RawWebSocketMessage:
                case OperationType.GraphQLMessage:
                case OperationType.SignalRMessage:
                    this.addMessage(this.timeSortedOperations[i]);
                    break;
                default:
                    break;
            }

            this.addDelay(i);

        }

        this.scenario.code += endingCode();

        return this.scenario;

    }

    private addHttp(operation: IOperation) {

        this.scenario!.code += `await c.Http("${operation.operationId}");\n\n`;

    }

    private addChannel(operation: IOperation) {

        const wsChannel = () => {
            switch (operation.type) {
                case OperationType.RawWebSocketChannel:
                    return "webSocketChannel";
                case OperationType.SignalRChannel:
                    return "signalRChannel";
                case OperationType.GraphQLChannel:
                    return "graphQLChannel"
                default:
                    return ""
            }
        }
        const channelCount = this.channelTypeCounts.get(operation.type)!;
        this.channelTypeCounts.set(operation.type, channelCount + 1);
        const nextChannelName = `${wsChannel()}${channelCount + 1}`;
        this.channelNames.set(operation.operationId, nextChannelName);

        this.scenario!.code += `var ${nextChannelName} = await c.${this.capFirst(wsChannel())}("${operation.operationId}");\n\n`;

    }

    private addMessage(operation: IOperation) {

        const wsMessage = () => {
            switch (operation.type) {
                case OperationType.RawWebSocketMessage:
                    return "webSocketMessage";
                case OperationType.SignalRMessage:
                    return "signalRMessage";
                case OperationType.GraphQLMessage:
                    return "graphQLMessage"
                default:
                    return ""
            }
        }
        const channelName = this.channelNames.get(operation.parentId!);

        this.scenario!.code += `await c.${this.capFirst(wsMessage())}(${channelName}, "${operation.operationId}");\n\n`;

    }

    private addDelay(index: number): void {

        if (index + 1 >= this.timeSortedOperations.length) return;

        const current = this.timeSortedOperations[index];
        const next = this.timeSortedOperations[index + 1];

        if (current.duration === 0) return;

        const timeDifference = (next.time!.getTime() - current.time!.getTime());

        if (current.duration! > timeDifference) return;

        const delay = Math.floor(timeDifference - current.duration!);

        if (delay < 1) return;

        this.scenario!.code += `\t\tawait c.Delay(${delay});\n\n`;

    }

    private capFirst(value: string): string {
        return `${value.charAt(0).toUpperCase()}${value.substring(1)}`;
    }

}

function startingCode(): string {

    let code = "public class Script\n";
    code += "{\n";
    code += "\tprivate readonly IScenarioScriptContext c;\n\n";
    code += "\tpublic Script(IScenarioScriptContext context)\n";
    code += "\t{\n";
    code += "\t\tc = context;\n";
    code += "\t}\n\n";
    code += "\tpublic async Task Run()\n";
    code += "\t{\n\n";
    return code;

}

function endingCode(): string {

    return "\n\t}\n}\n\n";

}