import figlet from 'figlet'
import path from 'path';
import ncp from 'ncp';
import List from 'listr'
import { promisify } from 'util';

const copy = promisify(ncp);

const copyTemplateFiles =  async (templateDir, targetDir) => {
	return copy(templateDir, targetDir, {
			clobber: false
	});
};
const HelloMessage = () => {
    console.log(figlet.textSync('Hello : )', {
	    font: 'big',
	    horizontalLayout: 'default',
	    verticalLayout: 'default'
	}));
};

const actualPath = import.meta.url;
const templatesDir = path.resolve(new URL(actualPath).pathname,'../../nginx',
).slice(3)

const TaskList = async (argv) => {
	const tasks = new List([
    {
        title: 'Convert files',
        task:  async () => {
          	copyTemplateFiles(templatesDir, `${process.cwd()}/${argv[2]}`)
        }
    },
	]);
	await tasks.run();
}; 

const UsageList = () => {
    let usageList = 'Welcome to mytools\n';
    usageList += `Usage : \n   command [path or option] [option] [output] [pathToOutput]\n`;
    usageList += `Option : \n`;
    usageList += `  -h, display help message\n`;
    usageList += `  -t, option for convert file\n`;
    usageList += `  -o, option to specific path output file\n`;
    usageList += `Output : \n`;
    usageList += `  text, convert to plaintext\n`;
    usageList += `  json, convert to json\n`;
    console.log(usageList);
};

const HelpList = () => {
    let HelpList = 'Description : \n   List Command \n';
    HelpList += `Usage : \n   command [path or option] [option] [output] [pathToOutput]\n`;
    HelpList += `Option : \n`;
    HelpList += `  -h, display help message\n`;
    HelpList += `  -t, option for convert file\n`;
    usageList += `  -o, option to specific path output file\n`;
    HelpList += `Output : \n`;
    HelpList += `  text, convert to plaintext\n`;
    HelpList += `  json, convert to json\n`;
    HelpList += `Help : \n`;
    HelpList += `  You can use command like : mytools path/to/file -t json\n`;
    HelpList += `    the option '-t json' is optional, by default it run '-t text' convert to plaintext\n`;
    HelpList += `  Or, you can put the output file in specific path like '/User/johnmayer/Desktop/nginxlog.json'\n`;
    HelpList += `    the command looks like :'\n`;
    HelpList += `      mytools path/to/file -o /User/johnmayer/Desktop/nginxlog.txt'\n`;
    HelpList += `      or\n`;
    HelpList += `      mytools path/to/file -t json -o /User/johnmayer/Desktop/nginxlog.json\n`;
    console.log(HelpList);
};

export function cli(argv) {
    if(argv[2]===undefined){
        UsageList();
        return;
    }

    if(argv[2]=='-h'){
        HelpList();
        return;
    }

    TaskList(argv);
    
}