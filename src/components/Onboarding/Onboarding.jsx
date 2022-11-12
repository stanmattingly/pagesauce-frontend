import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ComponentForm from './ComponentForm';
import ContentForm from './ContentForm';
import { Api } from '../../Api';
import VerifyWebsite from './VerifyWebsite';


function Onboarding({selectedWebsite, verified, setVerified, components, setComponents}) {
    const [activeStep, setActiveStep] = useState(verified ? components.length > 0 ? 2 : 1 : 0);

    const api = new Api();

    useEffect(() => {
        if (selectedWebsite) {
            api.getComponents(selectedWebsite).then(components => {
                setComponents(components);
                if (components.length > 0) {
                    setActiveStep(2);
                } else {
                    let poll = setInterval(() => {
                        api.getComponents(selectedWebsite).then(components => {
                            if (components.length > 0) {
                                setComponents(components);
                                setActiveStep(2);
                                clearInterval(poll);
                            }
                        });
                    }, 500)
                }
            })
    
            if (!localStorage.getItem('onboarding-step')) {
                localStorage.setItem('onboarding-step', 0);
            }
        }
    }, []);

    useEffect(() => {
        if(verified) {
            setActiveStep(1);
        }
    }, [verified])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function handleIntegrateClick() {
        api.getSmartAddToken(selectedWebsite).then(token => {
            window.open(token.url_build, '_blank');
        });
    }

    const steps = [
        {
            label: 'Integrate with your Website',
            description: ``,
            form: <VerifyWebsite selectedWebsite={selectedWebsite} verified={verified} setVerified={setVerified}/>,
            action: handleNext,
            buttonText: "Next",
            disabled: !verified,
        },
        {
            label: 'Create your first Smart Elements',
            description: '',
            form: <Button variant="outlined" onClick={handleIntegrateClick}>Add Smart Elements</Button>,
            action: handleNext,
            buttonText: "Next",
            disabled: !components.length > 0,
        },
        {
            label: 'Add some Smart Content',
            description: `Smart Content is verbiage that you'd like to rotate amongst your existing website. For each component, create some content variations and lets see what makes you the most money.`,
            buttonText: "Finish",
            disabled: false,
        },
    ];

    return (
        <Box sx={{ maxWidth: 400, p:3 }} component={Paper}>
            <h1>Let's Get Started</h1>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            {step.form}
                            <Box sx={{ mb: 2, mt: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={step.action}
                                        sx={{ mt: 1, mr: 1 }}
                                        disabled={step.disabled}
                                    >
                                        {step.buttonText}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default Onboarding;