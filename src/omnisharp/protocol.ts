/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from 'path';
import { CompletionTriggerKind, CompletionItemKind, CompletionItemTag, InsertTextFormat } from 'vscode-languageserver-protocol';

export module Requests {
    export const AddToProject = '/addtoproject';
    export const CodeCheck = '/codecheck';
    export const CodeFormat = '/codeformat';
    export const ChangeBuffer = '/changebuffer';
    export const FilesChanged = '/filesChanged';
    export const FindSymbols = '/findsymbols';
    export const FindUsages = '/findusages';
    export const FormatAfterKeystroke = '/formatAfterKeystroke';
    export const FormatRange = '/formatRange';
    export const GetCodeActions = '/getcodeactions';
    export const GoToTypeDefinition = '/gototypedefinition';
    export const FindImplementations = '/findimplementations';
    export const Project = '/project';
    export const Projects = '/projects';
    export const RemoveFromProject = '/removefromproject';
    export const Rename = '/rename';
    export const RunCodeAction = '/runcodeaction';
    export const SignatureHelp = '/signatureHelp';
    export const TypeLookup = '/typelookup';
    export const UpdateBuffer = '/updatebuffer';
    export const Metadata = '/metadata';
    export const RunFixAll = '/runfixall';
    export const GetFixAll = '/getfixall';
    export const ReAnalyze = '/reanalyze';
    export const QuickInfo = '/quickinfo';
    export const Completion = '/completion';
    export const CompletionResolve = '/completion/resolve';
    export const CompletionAfterInsert = '/completion/afterInsert';
    export const SourceGeneratedFile = '/sourcegeneratedfile';
    export const UpdateSourceGeneratedFile = '/updatesourcegeneratedfile';
    export const SourceGeneratedFileClosed = '/sourcegeneratedfileclosed';
    export const InlayHint = '/inlayHint';
    export const InlayHintResolve = '/inlayHint/resolve';
    export const FileOpen = '/open';
    export const FileClose = '/close';
}

export namespace WireProtocol {
    export interface Packet {
        Type: string;
        Seq: number;
    }

    export interface RequestPacket extends Packet {
        Command: string;
        Arguments: any;
    }

    export interface ResponsePacket extends Packet {
        Command: string;
        Request_seq: number;
        Running: boolean;
        Success: boolean;
        Message: string;
        Body: any;
    }

    export interface EventPacket extends Packet {
        Event: string;
        Body: any;
    }
}

export interface FileBasedRequest {
    FileName: string;
}

export interface Request extends FileBasedRequest {
    Line?: number;
    Column?: number;
    Buffer?: string;
    Changes?: LinePositionSpanTextChange[];
    ApplyChangesTogether?: boolean;
}

export interface FindImplementationsRequest extends Request {
}

export interface LinePositionSpanTextChange {
    NewText: string;
    StartLine: number;
    StartColumn: number;
    EndLine: number;
    EndColumn: number;
}

export interface MetadataSource {
    AssemblyName: string;
    ProjectName: string;
    VersionNumber: string;
    Language: string;
    TypeName: string;
}

export interface MetadataRequest extends MetadataSource {
    Timeout?: number;
}

export interface MetadataResponse {
    SourceName: string;
    Source: string;
}

export interface UpdateBufferRequest extends Request {
    FromDisk?: boolean;
}

export interface ChangeBufferRequest {
    FileName: string;
    StartLine: number;
    StartColumn: number;
    EndLine: number;
    EndColumn: number;
    NewText: string;
}

export interface AddToProjectRequest extends Request {
    //?
}

export interface RemoveFromProjectRequest extends Request {
    //?
}

export interface FindUsagesRequest extends Request {
    //        MaxWidth: number; ?
    OnlyThisFile: boolean;
    ExcludeDefinition: boolean;
}

export interface FindSymbolsRequest extends Request {
    Filter: string;
    MaxItemsToReturn?: number;
}

export interface FormatRequest extends Request {
    ExpandTab: boolean;
}

export interface CodeActionRequest extends Request {
    CodeAction: number;
    WantsTextChanges?: boolean;
    SelectionStartColumn?: number;
    SelectionStartLine?: number;
    SelectionEndColumn?: number;
    SelectionEndLine?: number;
}

export interface FormatResponse {
    Buffer: string;
}

export interface TextChange {
    NewText: string;
    StartLine: number;
    StartColumn: number;
    EndLine: number;
    EndColumn: number;
}

export interface FormatAfterKeystrokeRequest extends Request {
    Character: string;
}

export interface FormatRangeRequest extends Request {
    EndLine: number;
    EndColumn: number;
}

export interface FormatRangeResponse {
    Changes: TextChange[];
}

export interface ResourceLocation {
    FileName: string;
    Line: number;
    Column: number;
}


export interface Error {
    Message: string;
    Line: number;
    Column: number;
    EndLine: number;
    EndColumn: number;
    FileName: string;
}

export interface ErrorResponse {
    Errors: Error[];
}

export interface QuickFix {
    LogLevel: string;
    FileName: string;
    Line: number;
    Column: number;
    EndLine: number;
    EndColumn: number;
    Text: string;
    Projects: string[];
    Tags: string[];
    Id: string;
}

export interface SymbolLocation extends QuickFix {
    Kind: string;
}

export interface QuickFixResponse {
    QuickFixes: QuickFix[];
}

export interface FindSymbolsResponse {
    QuickFixes: SymbolLocation[];
}

export interface DocumentationItem {
    Name: string;
    Documentation: string;
}

export interface DocumentationComment {
    SummaryText: string;
    TypeParamElements: DocumentationItem[];
    ParamElements: DocumentationItem[];
    ReturnsText: string;
    RemarksText: string;
    ExampleText: string;
    ValueText: string;
    Exception: DocumentationItem[];
}

export interface TypeLookupRequest extends Request {
    IncludeDocumentation: boolean;
}

export interface TypeLookupResponse {
    Type: string;
    Documentation: string;
    StructuredDocumentation: DocumentationComment;
}

export interface RunCodeActionResponse {
    Text: string;
    Changes: TextChange[];
}

export interface GetCodeActionsResponse {
    CodeActions: string[];
}

export interface RunFixAllActionResponse {
    Text: string;
    Changes: FileOperationResponse[];
}

export interface FixAllItem {
    Id: string;
    Message: string;
}

export interface GetFixAllResponse {
    Items: FixAllItem[];
}

export interface SyntaxFeature {
    Name: string;
    Data: string;
}

export interface ProjectInformationResponse {
    MsBuildProject: MSBuildProject;
}

export enum DiagnosticStatus {
    Processing = 0,
    Ready = 1
}

export interface ProjectDiagnosticStatus {
    Status: DiagnosticStatus;
    ProjectFilePath: string;
    Type: "background";
}

export interface WorkspaceInformationResponse {
    MsBuild?: MsBuildWorkspaceInformation;
    DotNet?: DotNetWorkspaceInformation;
    ScriptCs?: ScriptCsContext;
    Cake?: CakeContext;
}

export interface MsBuildWorkspaceInformation {
    SolutionPath: string;
    Projects: MSBuildProject[];
}

export interface ScriptCsContext {
    CsxFiles: { [n: string]: string };
    References: { [n: string]: string };
    Usings: { [n: string]: string };
    ScriptPacks: { [n: string]: string };
    Path: string;
}

export interface CakeContext {
    Path: string;
}

export interface MSBuildProject {
    ProjectGuid: string;
    Path: string;
    AssemblyName: string;
    TargetPath: string;
    TargetFramework: string;
    SourceFiles: string[];
    TargetFrameworks: TargetFramework[];
    OutputPath: string;
    IsExe: boolean;
    IsUnityProject: boolean;
    IsWebProject: boolean;
    IsBlazorWebAssemblyStandalone: boolean;
    IsBlazorWebAssemblyHosted: boolean;
}

export interface TargetFramework {
    Name: string;
    FriendlyName: string;
    ShortName: string;
}

export interface DotNetWorkspaceInformation {
    Projects: DotNetProject[];
    RuntimePath: string;
}

export interface DotNetProject {
    Path: string;
    Name: string;
    ProjectSearchPaths: string[];
    Configurations: DotNetConfiguration[];
    Frameworks: DotNetFramework[];
    SourceFiles: string[];
}

export interface DotNetConfiguration {
    Name: string;
    CompilationOutputPath: string;
    CompilationOutputAssemblyFile: string;
    CompilationOutputPdbFile: string;
    EmitEntryPoint?: boolean;
}

export interface DotNetFramework {
    Name: string;
    FriendlyName: string;
    ShortName: string;
}

export interface RenameRequest extends Request {
    RenameTo: string;
    WantsTextChanges?: boolean;
    ApplyTextChanges: boolean;
}

export interface FileOperationResponse {
    FileName: string;
    ModificationType: FileModificationType;
}

export interface ModifiedFileResponse extends FileOperationResponse {
    Buffer: string;
    Changes: TextChange[];
}

export interface RenamedFileResponse extends FileOperationResponse {
    NewFileName: string;
}

export interface OpenFileResponse extends FileOperationResponse {
}

export enum FileModificationType {
    Modified,
    Opened,
    Renamed,
}

export interface RenameResponse {
    Changes: ModifiedFileResponse[];
}

export interface SignatureHelp {
    Signatures: SignatureHelpItem[];
    ActiveSignature: number;
    ActiveParameter: number;
}

export interface SignatureHelpItem {
    Name: string;
    Label: string;
    Documentation: string;
    Parameters: SignatureHelpParameter[];
    StructuredDocumentation: DocumentationComment;
}

export interface SignatureHelpParameter {
    Name: string;
    Label: string;
    Documentation: string;
}

export interface MSBuildProjectDiagnostics {
    FileName: string;
    Warnings: MSBuildDiagnosticsMessage[];
    Errors: MSBuildDiagnosticsMessage[];
}

export interface MSBuildDiagnosticsMessage {
    LogLevel: string;
    FileName: string;
    Text: string;
    StartLine: number;
    StartColumn: number;
    EndLine: number;
    EndColumn: number;
}

export interface ErrorMessage {
    Text: string;
    FileName: string;
    Line: number;
    Column: number;
}

export interface PackageRestoreMessage {
    FileName: string;
    Succeeded: boolean;
}

export interface UnresolvedDependenciesMessage {
    FileName: string;
    UnresolvedDependencies: PackageDependency[];
}

export interface ProjectConfigurationMessage {
    ProjectId: string;
    SessionId: string;
    OutputKind: number;
    ProjectCapabilities: string[];
    TargetFrameworks: string[];
    References: string[];
    FileExtensions: string[];
    FileCounts: number[];
}

export interface PackageDependency {
    Name: string;
    Version: string;
}

export interface FilesChangedRequest extends Request {
    ChangeType: FileChangeType;
}

export enum FileChangeType {
    Change = "Change",
    Create = "Create",
    Delete = "Delete",
    DirectoryDelete = "DirectoryDelete"
}

export enum FixAllScope {
    Document = "Document",
    Project = "Project",
    Solution = "Solution"
}

export interface GetFixAllRequest extends FileBasedRequest {
    Scope: FixAllScope;
    FixAllFilter?: FixAllItem[];
}

export interface RunFixAllRequest extends FileBasedRequest {
    Scope: FixAllScope;
    FixAllFilter?: FixAllItem[];
    WantsTextChanges: boolean;
    WantsAllCodeActionOperations: boolean;
    ApplyChanges: boolean;
}

export interface QuickInfoRequest extends Request {
}

export interface QuickInfoResponse {
    Markdown?: string;
}

export interface CompletionRequest extends Request {
    CompletionTrigger: CompletionTriggerKind;
    TriggerCharacter?: string;
}

export interface CompletionResponse {
    IsIncomplete: boolean;
    Items: OmnisharpCompletionItem[];
}

export interface CompletionResolveRequest {
    Item: OmnisharpCompletionItem;
}

export interface CompletionResolveResponse {
    Item: OmnisharpCompletionItem;
}

export interface CompletionAfterInsertionRequest {
    Item: OmnisharpCompletionItem;
}

export interface CompletionAfterInsertResponse {
    Changes?: LinePositionSpanTextChange[];
    Line?: number;
    Column?: number;
}

export interface OmnisharpCompletionItem {
    Label: string;
    Kind: CompletionItemKind;
    Tags?: CompletionItemTag[];
    Detail?: string;
    Documentation?: string;
    Preselect: boolean;
    SortText?: string;
    FilterText?: string;
    InsertText?: string;
    InsertTextFormat?: InsertTextFormat;
    TextEdit?: LinePositionSpanTextChange;
    CommitCharacters?: string[];
    AdditionalTextEdits?: LinePositionSpanTextChange[];
    Data: any;
    HasAfterInsertStep: boolean;
}

export interface SourceGeneratedFileInfo {
    ProjectGuid: string;
    DocumentGuid: string;
}

export interface SourceGeneratedFileRequest extends SourceGeneratedFileInfo {
}

export interface SourceGeneratedFileResponse {
    Source: string;
    SourceName: string;
}

export interface UpdateSourceGeneratedFileRequest extends SourceGeneratedFileInfo {
}

export interface UpdateSourceGeneratedFileResponse {
    UpdateType: UpdateType;
    Source?: string;
}

export enum UpdateType {
    Unchanged,
    Deleted,
    Modified
}

export interface SourceGeneratedFileClosedRequest extends SourceGeneratedFileInfo {
}

export interface InlayHintRequest {
    Location: V2.Location;
}

export interface InlayHint {
    Position: V2.Point;
    Label: string;
    Tooltip?: string;
    Data: any;
}

export interface InlayHintResponse {
    InlayHints: InlayHint[];
}

export interface InlayHintResolve {
    Hint: InlayHint;
}

export interface Definition {
    Location: V2.Location;
    MetadataSource?: MetadataSource;
    SourceGeneratedFileInfo?: SourceGeneratedFileInfo;
}

export interface GoToTypeDefinitionRequest extends Request {
    WantMetadata?: boolean;
}

export interface GoToTypeDefinitionResponse {
    Definitions?: Definition[];
}


export namespace V2 {

    export module Requests {
        export const GetCodeActions = '/v2/getcodeactions';
        export const RunCodeAction = '/v2/runcodeaction';
        export const GetTestStartInfo = '/v2/getteststartinfo';
        export const RunTest = '/v2/runtest';
        export const RunAllTestsInClass = "/v2/runtestsinclass";
        export const RunTestsInContext = "/v2/runtestsincontext";
        export const DebugTestGetStartInfo = '/v2/debugtest/getstartinfo';
        export const DebugTestsInClassGetStartInfo = '/v2/debugtestsinclass/getstartinfo';
        export const DebugTestsInContextGetStartInfo = '/v2/debugtestsincontext/getstartinfo';
        export const DebugTestLaunch = '/v2/debugtest/launch';
        export const DebugTestStop = '/v2/debugtest/stop';
        export const DiscoverTests = '/v2/discovertests';
        export const BlockStructure = '/v2/blockstructure';
        export const CodeStructure = '/v2/codestructure';
        export const Highlight = '/v2/highlight';
        export const GoToDefinition = '/v2/gotodefinition';
    }

    export interface SemanticHighlightSpan {
        StartLine: number;
        StartColumn: number;
        EndLine: number;
        EndColumn: number;
        Type: number;
        Modifiers: number[];
    }

    export interface SemanticHighlightRequest extends Request {
        Range?: Range;
        VersionedText?: string;
    }

    export interface SemanticHighlightResponse {
        Spans: SemanticHighlightSpan[];
    }

    export interface Point {
        Line: number;
        Column: number;
    }

    export interface Range {
        Start: Point;
        End: Point;
    }

    export interface Location {
        FileName: string;
        Range: Range;
    }

    export interface GetCodeActionsRequest extends Request {
        Selection?: Range;
    }

    export interface OmniSharpCodeAction {
        Identifier: string;
        Name: string;
    }

    export interface GetCodeActionsResponse {
        CodeActions: OmniSharpCodeAction[];
    }

    export interface RunCodeActionRequest extends Request {
        Identifier: string;
        Selection?: Range;
        WantsTextChanges: boolean;
        WantsAllCodeActionOperations: boolean;
        ApplyTextChanges: boolean;
    }

    export interface RunCodeActionResponse {
        Changes: FileOperationResponse[];
    }

    export interface MSBuildProjectDiagnostics {
        FileName: string;
        Warnings: MSBuildDiagnosticsMessage[];
        Errors: MSBuildDiagnosticsMessage[];
    }

    export interface MSBuildDiagnosticsMessage {
        LogLevel: string;
        FileName: string;
        Text: string;
        StartLine: number;
        StartColumn: number;
        EndLine: number;
        EndColumn: number;
    }

    export interface ErrorMessage {
        Text: string;
        FileName: string;
        Line: number;
        Column: number;
    }

    export interface PackageRestoreMessage {
        FileName: string;
        Succeeded: boolean;
    }

    export interface UnresolvedDependenciesMessage {
        FileName: string;
        UnresolvedDependencies: PackageDependency[];
    }

    export interface PackageDependency {
        Name: string;
        Version: string;
    }

    // dotnet-test endpoints
    interface BaseTestRequest extends Request {
        RunSettings: string;
        TestFrameworkName: string;
        TargetFrameworkVersion: string;
        NoBuild?: boolean;
    }

    interface SingleTestRequest extends BaseTestRequest {
        MethodName: string;
    }

    interface MultiTestRequest extends BaseTestRequest {
        MethodNames: string[];
    }

    interface TestsInContextRequest extends Request {
        RunSettings?: string;
        TargetFrameworkVersion?: string;
    }

    export interface DebugTestGetStartInfoRequest extends SingleTestRequest {
    }

    export interface DebugTestClassGetStartInfoRequest extends MultiTestRequest {
    }

    export interface DebugTestGetStartInfoResponse {
        FileName: string;
        Arguments: string;
        WorkingDirectory: string;
        EnvironmentVariables: Map<string, string>;
        Succeeded: boolean;
        ContextHadNoTests: boolean;
        FailureReason?: string;
    }

    export interface DebugTestLaunchRequest extends Request {
        TargetProcessId: number;
    }

    export interface DebugTestLaunchResponse {
    }

    export interface DebugTestStopRequest extends Request {
    }

    export interface DebugTestStopResponse {
    }

    export interface DiscoverTestsRequest extends BaseTestRequest {

    }

    export interface TestInfo {
        FullyQualifiedName: string;
        DisplayName: string;
        Source: string;
        CodeFilePath: string;
        LineNumber: number;
    }

    export interface DiscoverTestsResponse {
        Tests: TestInfo[];
    }

    export interface GetTestStartInfoRequest extends SingleTestRequest {
    }

    export interface GetTestStartInfoResponse {
        Executable: string;
        Argument: string;
        WorkingDirectory: string;
    }

    export interface RunTestRequest extends SingleTestRequest {
    }

    export interface RunTestsInClassRequest extends MultiTestRequest {
    }

    export interface RunTestsInContextRequest extends TestsInContextRequest {
    }

    export interface DebugTestsInContextGetStartInfoRequest extends TestsInContextRequest {
    }

    export module TestOutcomes {
        export const None = 'none';
        export const Passed = 'passed';
        export const Failed = 'failed';
        export const Skipped = 'skipped';
        export const NotFound = 'notfound';
    }

    export interface DotNetTestResult {
        MethodName: string;
        Outcome: string;
        ErrorMessage: string;
        ErrorStackTrace: string;
        StandardOutput: string[];
        StandardError: string[];
    }

    export interface RunTestResponse {
        Failure: string;
        Pass: boolean;
        Results: DotNetTestResult[];
        ContextHadNoTests: boolean;
    }

    export interface TestMessageEvent {
        MessageLevel: string;
        Message: string;
    }

    export interface BlockStructureRequest {
        FileName: string;
    }

    export interface BlockStructureResponse {
        Spans: CodeFoldingBlock[];
    }

    export interface CodeFoldingBlock {
        Range: Range;
        Kind: string;
    }

    export module SymbolKinds {
        // types
        export const Class = 'class';
        export const Delegate = 'delegate';
        export const Enum = 'enum';
        export const Interface = 'interface';
        export const Struct = 'struct';

        // members
        export const Constant = 'constant';
        export const Constructor = 'constructor';
        export const Destructor = 'destructor';
        export const EnumMember = 'enummember';
        export const Event = 'event';
        export const Field = 'field';
        export const Indexer = 'indexer';
        export const Method = 'method';
        export const Operator = 'operator';
        export const Property = 'property';

        // other
        export const Namespace = 'namespace';
        export const Unknown = 'unknown';
    }

    export module SymbolAccessibilities {
        export const Internal = 'internal';
        export const Private = 'private';
        export const PrivateProtected = 'private protected';
        export const Protected = 'protected';
        export const ProtectedInternal = 'protected internal';
        export const Public = 'public';
    }

    export module SymbolPropertyNames {
        export const Accessibility = 'accessibility';
        export const Static = 'static';
        export const TestFramework = 'testFramework';
        export const TestMethodName = 'testMethodName';
    }

    export module SymbolRangeNames {
        export const Attributes = 'attributes';
        export const Full = 'full';
        export const Name = 'name';
    }

    export namespace Structure {
        export interface CodeElement {
            Kind: string;
            Name: string;
            DisplayName: string;
            Children?: CodeElement[];
            Ranges: { [name: string]: Range };
            Properties?: { [name: string]: any };
        }

        export interface CodeStructureRequest extends FileBasedRequest {
        }

        export interface CodeStructureResponse {
            Elements?: CodeElement[];
        }

        export function walkCodeElements(elements: CodeElement[], action: (element: CodeElement, parentElement?: CodeElement) => void) {
            function walker(elements: CodeElement[], parentElement?: CodeElement) {
                for (let element of elements) {
                    action(element, parentElement);

                    if (element.Children) {
                        walker(element.Children, element);
                    }
                }
            }

            walker(elements);
        }
    }

    export interface GoToDefinitionRequest extends Request {
        WantMetadata?: boolean;
    }

    export interface GoToDefinitionResponse {
        Definitions?: Definition[];
    }

    export interface Definition {
        Location: Location;
        MetadataSource?: MetadataSource;
        SourceGeneratedFileInfo?: SourceGeneratedFileInfo;
    }
}

export function findNetFrameworkTargetFramework(project: MSBuildProject): TargetFramework | undefined {
    const regexp = new RegExp('^net[1-4]');
    return project.TargetFrameworks.find(tf => regexp.test(tf.ShortName));
}

export function findNetCoreTargetFramework(project: MSBuildProject): TargetFramework | undefined {
    return findNetCoreAppTargetFramework(project) ?? findModernNetFrameworkTargetFramework(project);
}

export function findNetCoreAppTargetFramework(project: MSBuildProject): TargetFramework | undefined {
    return project.TargetFrameworks.find(tf => tf.ShortName.startsWith('netcoreapp'));
}

export function findModernNetFrameworkTargetFramework(project: MSBuildProject): TargetFramework | undefined {
    const regexp = new RegExp('^net[5-9]');
    const targetFramework = project.TargetFrameworks.find(tf => regexp.test(tf.ShortName));

    // Shortname is being reported as net50 instead of net5.0
    if (targetFramework !== undefined && targetFramework.ShortName.charAt(4) !== ".") {
        targetFramework.ShortName = `${targetFramework.ShortName.substring(0, 4)}.${targetFramework.ShortName.substring(4)}`;
    }

    return targetFramework;
}

export function findNetStandardTargetFramework(project: MSBuildProject): TargetFramework | undefined {
    return project.TargetFrameworks.find(tf => tf.ShortName.startsWith('netstandard'));
}

export function isDotNetCoreProject(project: MSBuildProject): boolean {
    return findNetCoreTargetFramework(project) !== undefined ||
        findNetStandardTargetFramework(project) !== undefined ||
        findNetFrameworkTargetFramework(project) !== undefined;
}

export interface ProjectDescriptor {
    Name: string;
    Directory: string;
    FilePath: string;
}

export function getDotNetCoreProjectDescriptors(info: WorkspaceInformationResponse): ProjectDescriptor[] {
    let result = [];

    if (info.DotNet && info.DotNet.Projects.length > 0) {
        for (let project of info.DotNet.Projects) {
            result.push({
                Name: project.Name,
                Directory: project.Path,
                FilePath: path.join(project.Path, 'project.json')
            });
        }
    }

    if (info.MsBuild && info.MsBuild.Projects.length > 0) {
        for (let project of info.MsBuild.Projects) {
            if (isDotNetCoreProject(project)) {
                result.push({
                    Name: path.basename(project.Path),
                    Directory: path.dirname(project.Path),
                    FilePath: project.Path
                });
            }
        }
    }

    return result;
}

export function findExecutableMSBuildProjects(projects: MSBuildProject[]) {
    let result: MSBuildProject[] = [];

    projects.forEach(project => {
        const projectIsNotNetFramework = findNetCoreTargetFramework(project) !== undefined
            || project.IsBlazorWebAssemblyStandalone;

        if (project.IsExe && projectIsNotNetFramework) {
            result.push(project);
        }
    });

    return result;
}
