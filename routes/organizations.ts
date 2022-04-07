const Organization = require('../models/organization-model')

export const getOrganizationById = async (req: any, res: any) => {
    const organizationId = req.params.organizationId;
    try {
        const organization = await Organization.findById(organizationId);
        if (organization) {
            return res.status(200).json(organization)
        } else {
            return res.status(404).json({ message: 'Organization not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

export const postOrganization = async (req: any, res: any) => {
    const organization = new Organization(req.body)

    try {
        const savedOrg = await organization.save()
        res.status(201).json(savedOrg)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};