import {
    Card,
    CardContent,
    CardActions,
    Button,
    CardHeader,
    Typography,
    Grid,
    TextField,
    Checkbox,
} from "@mui/material"
import {
    CheckBox,
} from '@mui/icons-material'
import { useEffect, useState } from "react"
import { Api } from "../../Api";

function VerifyWebsite({ selectedWebsite, verified, setVerified }) {
    const [script, setScript] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifyButtonText, setVerifyButtonText] = useState(verified ? 'Verified' : 'Verify')

    const api = new Api();

    useEffect(() => {
        api.getWesbite(selectedWebsite).then(website => {
            setScript(`<script src="https://cdn.jsdelivr.net/gh/stanmattingly/smart-content-integration/smart-39.js" data-smart-auth-id="${website.token.key}" />`)
            setVerified(website.verified_at ? true : false)
        })
    }, [])
 
    function handleCopy() {
        navigator.clipboard.writeText(script);
        setCopied(true);
    }

    function handleVerify() {
        setLoading(true);
        setVerifyButtonText("Verifying...")
        api.verifyWebsite(selectedWebsite).then(website => {
            if (website.verified_at) {
                setVerified(true);
                setLoading(false);
                setVerifyButtonText("Verified")
            } else {
                setLoading(false);
                setLoading(false)
                setVerifyButtonText("Verify")
            }
        })
    }

    return (
        <Card elevation={0} sx={{margin: 0, padding: 0}}>
            <CardHeader
                title="Welcome!"
                subheader="Let's verify and integrate your website."
            />
            <CardContent sx={{ mt: 0, pt: 0 }}>
                <Typography>To get started, you'll need to add the following script to your website on all pages that you wish to use Smart Content.</Typography>
                <TextField
                    id="outlined-textarea"
                    value={script}
                    multiline
                    rows={6}
                    fullWidth
                    sx={{marginTop: "20px"}}
                    disabled
                />
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', mt: 0 }}>
                <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</Button>  
                <Button 
                    onClick={handleVerify} 
                    endIcon={<CheckBox/>} 
                    variant={"contained"} 
                    color={'success'}
                >
                    {verifyButtonText}
                </Button>
            </CardActions>
        </Card>
    )
}

export default VerifyWebsite