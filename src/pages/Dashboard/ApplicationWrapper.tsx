import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { Drawer, useMediaQuery } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CreateIcon from '@material-ui/icons/Create';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import { useHistory } from 'react-router-dom';
import { fileInfo } from '../../apollo/reactiveVariables';

const useStyles = makeStyles(theme=>({
  list: {
    width: '100%',
    marginTop: '32px',
  },
  fullList: {
    width: 'auto',
  },
  typography: {
    fontSize: '18px',
    textAlign: 'center',
    paddingLeft: '16px',
    [theme.breakpoints.down('md')]:{
    	fontSize: '16px',
    },
  },
  leftPanel: {
  	display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: '32px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  mobileCon: {
  	display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow:' 0px 1px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#F7F8FB',
    padding: '0 11px 0 11px',
  },
  fileInfo:{
    backgroundColor: '#CC9010',
  },
  attachFiles:{
    backgroundColor: '#CC9010',
  },
  createFileInfo:{
    backgroundColor: '#CC9010',
  },
  createAttachFiles:{
    backgroundColor: '#CC9010',
  },
}));

interface Props {
  active: string
}

const ApplicationWrapper = ({ active }:Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [color, setColor] = React.useState('');
  const [openCreate, setOpenCreate] = React.useState(true);
  const [drawer, setDrawer] = React.useState(false);
  const isMobileTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    setOpen(!open);
  };
  const toggle = () => {
  	setDrawer(!drawer);
  };
  const handleNavigate = (path:string) => {
    history.push(path);
    setColor('#CC9010');
    toggle();
    fileInfo({
      unit: '',
      unitId: '',
    });
  };
  return (
  	<>
			{
				isMobileTablet ? (
					<>
					<div className={classes.mobileCon}>
						<MenuIcon onClick={toggle} />
						<Typography className={classes.typography}>
							FANAKA DASHBOARD
						</Typography>
					</div>
						<Drawer anchor="left" open={drawer} onClose={toggle}>
							<div
								className={clsx(classes.list)}
								role="presentation"
							>
								<List>
									<ListItem button onClick={handleClick}>
										<ListItemIcon>
											<BackupOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary="Files Upload" />
										{open ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={open} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItem style={{ backgroundColor:active === 'file-info' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/file-info')} button className={clsx(active === 'file-info' && classes.fileInfo, classes.nested)}>
												<ListItemIcon>
													<InfoOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="File Info" />
											</ListItem>
											<ListItem style={{ backgroundColor:active === 'attach-files' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/attach-files')} className={clsx(active === 'attach-files' && classes.attachFiles, classes.nested)} button>
												<ListItemIcon>
													<AttachmentOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="Attach Files" />
											</ListItem>
										</List>
									</Collapse>
								</List>
								<List>
									<ListItem button onClick={()=>setOpenCreate(!openCreate)}>
										<ListItemIcon>
											<AddOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary="Create Semester/Unit" />
										{openCreate ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={openCreate} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItem style={{ backgroundColor:active === 'create-file-info' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/create-file-info')} className={clsx(active === 'create-file-info' && classes.createFileInfo, classes.nested)} button>
												<ListItemIcon>
													<InfoOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="Create File Info" />
											</ListItem>
											<ListItem style={{ backgroundColor:active === 'create-attach-files' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/create-attach-files')} button className={clsx(active === 'create-attach-files' && classes.createAttachFiles, classes.nested)}>
												<ListItemIcon>
													<AttachmentOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="Create Attach Files" />
											</ListItem>
										</List>
									</Collapse>
								</List>
                <List>
                  <ListItem button onClick={()=>setOpenCreate(!openCreate)}>
                    <ListItemIcon>
                      <VisibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Uploaded Files" />
                    {openCreate ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openCreate} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem style={{ backgroundColor:active === 'uploaded-files-info' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/uploaded-files-info')} button className={clsx(active === 'uploaded-files-info' && classes.createFileInfo, classes.nested)}>
                        <ListItemIcon>
                          <InfoOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="File Info" />
                      </ListItem>
                      <ListItem style={{ backgroundColor:active === 'uploaded-files-view' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/uploaded-files-view')} button className={clsx(active === 'uploaded-files-view' && classes.createAttachFiles, classes.nested)}>
                        <ListItemIcon>
                          <AttachmentOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Files" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
                <List>
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                      <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rooms" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem style={{ backgroundColor:active === 'create-room' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/create-room')} button className={clsx(active === 'create-room' && classes.fileInfo, classes.nested)}>
                        <ListItemIcon>
                          <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Room" />
                      </ListItem>
                      <ListItem style={{ backgroundColor:active === 'join-room' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/join-room')} className={clsx(active === 'join-room' && classes.attachFiles, classes.nested)} button>
                        <ListItemIcon>
                          <TransitEnterexitIcon />
                        </ListItemIcon>
                        <ListItemText primary="Join Room" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
							</div>
						</Drawer>
						</>
				) : (
					<>
						<div className={classes.leftPanel}>
							<Typography className={classes.typography}>
								FANAKA DASHBOARD
							</Typography>
							<div
								className={clsx(classes.list)}
								role="presentation"
							>
								<List>
									<ListItem button onClick={handleClick}>
										<ListItemIcon>
											<BackupOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary="Files Upload" />
										{open ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={open} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItem style={{ backgroundColor:active === 'file-info' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/file-info')} button className={clsx(active === 'file-info' && classes.fileInfo, classes.nested)}>
												<ListItemIcon>
													<InfoOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="File Info" />
											</ListItem>
											<ListItem style={{ backgroundColor:active === 'attach-files' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/attach-files')} button className={clsx(active === 'attach-files' && classes.attachFiles, classes.nested)}>
												<ListItemIcon>
													<AttachmentOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="Attach Files" />
											</ListItem>
										</List>
									</Collapse>
								</List>
								<List>
									<ListItem button onClick={()=>setOpenCreate(!openCreate)}>
										<ListItemIcon>
											<AddOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary="Create Semester/Unit" />
										{openCreate ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={openCreate} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItem style={{ backgroundColor:active === 'create-file-info' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/create-file-info')} button className={clsx(active === 'create-file-info' && classes.createFileInfo, classes.nested)}>
												<ListItemIcon>
													<InfoOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="Create File Info" />
											</ListItem>
											<ListItem style={{ backgroundColor:active === 'create-attach-files' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/create-attach-files')} button className={clsx(active === 'create-attach-files' && classes.createAttachFiles, classes.nested)}>
												<ListItemIcon>
													<AttachmentOutlinedIcon />
												</ListItemIcon>
												<ListItemText primary="Create Attach Files" />
											</ListItem>
										</List>
									</Collapse>
								</List>
                <List>
                  <ListItem button onClick={()=>setOpenCreate(!openCreate)}>
                    <ListItemIcon>
                      <VisibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Uploaded Files" />
                    {openCreate ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openCreate} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem style={{ backgroundColor:active === 'uploaded-files-info' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/uploaded-files-info')} button className={clsx(active === 'uploaded-files-info' && classes.createFileInfo, classes.nested)}>
                        <ListItemIcon>
                          <InfoOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="File Info" />
                      </ListItem>
                      <ListItem style={{ backgroundColor:active === 'uploaded-files-view' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/uploaded-files-view')} button className={clsx(active === 'uploaded-files-view' && classes.createAttachFiles, classes.nested)}>
                        <ListItemIcon>
                          <AttachmentOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Files" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
                <List>
                  <ListItem button onClick={()=>setOpenCreate(!openCreate)}>
                    <ListItemIcon>
                      <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rooms" />
                    {openCreate ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={openCreate} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem style={{ backgroundColor:active === 'create-room' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/create-room')} button className={clsx(active === 'create-room' && classes.fileInfo, classes.nested)}>
                        <ListItemIcon>
                          <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Room" />
                      </ListItem>
                       <ListItem style={{ backgroundColor:active === 'join-room' ? color : '' }} onClick={()=>handleNavigate('/admin-dashboard/join-room')} className={clsx(active === 'join-room' && classes.attachFiles, classes.nested)} button>
                        <ListItemIcon>
                          <TransitEnterexitIcon />
                        </ListItemIcon>
                        <ListItemText primary="Join Room" />
                       </ListItem>
                    </List>
                  </Collapse>
                </List>
							</div>
						</div>
					</>
				)
			}
		</>

  );

};

export default ApplicationWrapper;
