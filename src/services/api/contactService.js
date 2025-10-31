import { getApperClient } from "@/services/apperClient"
import { toast } from "react-toastify"

export const contactService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.fetchRecords('contact_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "ModifiedOn", "sorttype": "DESC"}]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error("Error fetching contacts:", error?.message || error)
      return []
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.getRecordById('contact_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.message || error)
      return null
    }
  },

  async create(contactData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        records: [
          {
            Name: contactData.name_c || contactData.name || "",
            name_c: contactData.name_c || contactData.name || "",
            company_c: contactData.company_c || contactData.company || "",
            email_c: contactData.email_c || contactData.email || "",
            phone_c: contactData.phone_c || contactData.phone || "",
            notes_c: contactData.notes_c || contactData.notes || "",
            tags_c: contactData.tags_c || contactData.tags || ""
          }
        ]
      }

      const response = await apperClient.createRecord('contact_c', params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to create contact:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        const successful = response.results.filter(r => r.success)
        return successful[0]?.data || null
      }

      return null
    } catch (error) {
      console.error("Error creating contact:", error?.message || error)
      return null
    }
  },

  async update(id, contactData) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: contactData.name_c || contactData.name || "",
            name_c: contactData.name_c || contactData.name || "",
            company_c: contactData.company_c || contactData.company || "",
            email_c: contactData.email_c || contactData.email || "",
            phone_c: contactData.phone_c || contactData.phone || "",
            notes_c: contactData.notes_c || contactData.notes || "",
            tags_c: contactData.tags_c || contactData.tags || ""
          }
        ]
      }

      const response = await apperClient.updateRecord('contact_c', params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to update contact:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return null
        }
        const successful = response.results.filter(r => r.success)
        return successful[0]?.data || null
      }

      return null
    } catch (error) {
      console.error("Error updating contact:", error?.message || error)
      return null
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient()
      if (!apperClient) {
        throw new Error("ApperClient not initialized")
      }

      const response = await apperClient.deleteRecord('contact_c', {
        RecordIds: [parseInt(id)]
      })

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success)
        if (failed.length > 0) {
          console.error(`Failed to delete contact:`, failed)
          failed.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
        return true
      }

      return false
    } catch (error) {
      console.error("Error deleting contact:", error?.message || error)
      return false
    }
  }
}